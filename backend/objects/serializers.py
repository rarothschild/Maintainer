from .models import Object 
from users.serializers import UserSerializer
from rest_framework import serializers

class ObjectSerializer(serializers.ModelSerializer):

    class Meta:
            model = Object
            fields = ['id','owner','nickname','category','make','model','serialNum']
