from rest_framework import viewsets, status, permissions
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serializers import ObjectSerializer
from .models import Object

# Create your views here.
class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    permission_classes = [IsAuthenticated]

    def list(self,request):
        queryset = Object.objects.filter(owner=request.user)
        serializer = ObjectSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self,request):
        print(request.user)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=request.user)
        return Response({'object creation': 'successful!'},status=status.HTTP_201_CREATED)
