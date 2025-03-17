from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode


User = get_user_model()


# 🔹 LOGIN - Autenticação usando cookies para armazenar JWT
class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = response.data.pop("refresh", None)
        access = response.data.pop("access", None)

        if access:
            response.set_cookie(
                settings.SIMPLE_JWT["AUTH_COOKIE"],
                access,
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].seconds,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )

        if refresh:
            response.set_cookie(
                "refresh_token",
                refresh,
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].seconds,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=True,
                samesite="Lax",
            )

        return response


# 🔹 LOGOUT - Apaga os cookies ao sair
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logout realizado com sucesso."}, status=200)
        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
        return response


# 🔹 RECUPERAÇÃO DE SENHA - Envia e-mail para redefinir a senha
class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "E-mail é obrigatório"}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Usuário não encontrado"}, status=400)

        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # 🛠️ Alterado para apontar para o FRONT-END (Next.js)
        reset_url = f"http://localhost:3000/reset-password?uidb64={uid}&token={token}"

        send_mail(
            "Redefinição de Senha",
            f"Clique no link para redefinir sua senha: {reset_url}",
            "noreply@seusite.com",
            [email],
            fail_silently=False,
        )

        return Response({"message": "E-mail de redefinição enviado!"}, status=200)


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)

            if not default_token_generator.check_token(user, token):
                return Response({"error": "Token inválido ou expirado"}, status=400)

            new_password = request.data.get("password")
            if not new_password:
                return Response({"error": "A nova senha é obrigatória"}, status=400)

            user.set_password(new_password)
            user.save()

            return Response({"message": "Senha redefinida com sucesso!"}, status=200)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Link inválido"}, status=400)


class RefreshTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
        if not refresh_token:
            return Response({"error": "Token de atualização ausente"}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = refresh.access_token

            response = Response({"access": str(access_token)})
            response.set_cookie(
                settings.SIMPLE_JWT["AUTH_COOKIE"],
                str(access_token),
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].seconds,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )
            return response

        except Exception:
            return Response({"error": "Token inválido"}, status=401)
