from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UsuarioViewSet, TarefaViewSet
from .authentication_views import LoginView, LogoutView, PasswordResetRequestView, PasswordResetConfirmView

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'tarefas', TarefaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("password-reset/", PasswordResetRequestView.as_view(), name="password_reset_request"),
    path("password-reset-confirm/<uidb64>/<token>/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
]
