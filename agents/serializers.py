from rest_framework import serializers
from .models import Agent


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ["id", "name", "company", "email", "mobile", "status", "created_by", "created_at"]
        read_only_fields = ["created_by", "created_at"]