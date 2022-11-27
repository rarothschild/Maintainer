#from django.contrib.auth.models import User, Group
from django.contrib.auth import login
#from django.views.decorators.csrf import csrf_exempt
#from rest_framework import permissions
#from rest_framework.decorators import action
#from .serializers import UserSerializer, GroupSerializer
#from knox.views import LoginView as KnoxLoginView
#from rest_framework.authentication import BasicAuthentication
#from rest_framework.authtoken.serializers import AuthTokenSerializer

from django.contrib.auth import get_user_model
User = get_user_model()
# rest_framework imports
from rest_framework import generics, permissions, serializers
from rest_framework import viewsets
from rest_framework.settings import api_settings
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
# knox imports
from knox.models import AuthToken
# local apps import
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

#class LoginView(KnoxLoginView):
#    permission_classes = (permissions.AllowAny,)
#
#    def post(self, request, format=None):
#        serializer = AuthTokenSerializer(data=request.data)
#        serializer.is_valid(raise_exception=True)
#        user = serializer.validated_data['user']
#        login(request, user)
#        return super(LoginView, self).post(request, format=None)

# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]