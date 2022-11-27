from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, full_name, password, profile_picture=None, is_admin=False, is_staff=False, is_active=True,is_superuser=False):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")
        if not full_name:
            raise ValueError("User must have a full name")
        user = self.model(
            email=self.normalize_email(email)
        )
        user.full_name = full_name
        user.set_password(password)
        user.admin = is_admin
        user.profile_picture = profile_picture
        user.is_staff = is_staff
        user.is_active = is_active
        user.is_superuser = is_superuser
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, full_name, password=None):
        user = self.create_user(
            email,
            full_name,
            password=password,
            is_staff=True,
        )
        return user

    def create_superuser(self, email, full_name, password=None):
        user = self.create_user(
            email,
            full_name,
            password=password,
            is_staff=True,
            is_admin=True,
            is_superuser=True,
        )
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username =          models.CharField(max_length=255)
    full_name =         models.CharField(max_length=255)
    email =             models.EmailField(max_length=255, unique=True,)
    active =            models.BooleanField(default=True)
    is_staff =          models.BooleanField(default=False)  # a admin user; non super-user
    is_admin =          models.BooleanField(default=False)  # a superuser
    # notice the absence of a "Password field", that's built in.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']  # Email & Password are required by default.

    objects = UserManager()

    def __str__(self):
         return self.email