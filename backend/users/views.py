from django.contrib.auth.models import User, Group
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from .serializers import UserSerializer, GroupSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.authentication import BasicAuthentication

class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]