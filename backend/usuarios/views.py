from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions
from .models import Usuario
from .serializers import UsuarioSerializer
from .models import Tarefa
from .serializers import TarefaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [permissions.IsAuthenticated()]


class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tarefa.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=True, methods=['patch'])
    def toggle_concluida(self, request, pk=None):
        tarefa = self.get_object()
        tarefa.concluida = not tarefa.concluida
        tarefa.save()
        return Response({"status": "Tarefa atualizada"})

