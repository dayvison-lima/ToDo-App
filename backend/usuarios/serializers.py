from rest_framework import serializers
from .models import Usuario
from .models import Tarefa


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'password', 'cpf', 'data_nascimento']

    def create(self, validated_data):
        """ Cria um usuário com a senha criptografada """
        user = Usuario(
            username=validated_data['username'],
            email=validated_data['email'],
            cpf=validated_data.get('cpf', None),
            data_nascimento=validated_data.get('data_nascimento', None)
        )
        if 'password' in validated_data:
            user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        """ Atualiza o usuário sem exigir senha """
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.cpf = validated_data.get('cpf', instance.cpf)
        instance.data_nascimento = validated_data.get('data_nascimento', instance.data_nascimento)

        if 'password' in validated_data and validated_data['password']:  
            instance.set_password(validated_data['password'])

        instance.save()
        return instance


class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = ['id', 'titulo', 'descricao', 'concluida', 'criada_em']
        read_only_fields = ['id', 'criada_em']