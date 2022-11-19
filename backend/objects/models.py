from django.db import models
from django.contrib.auth.models import User

class Object(models.Model):
    owner       = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    nickname    = models.CharField(max_length=255, default='', blank=False, null=False)
    type        = models.CharField(max_length=255, default='',blank=True, null=False)
    make        = models.CharField(max_length=255, default='',blank=True, null=False)
    model       = models.CharField(max_length=255, default='',blank=True, null=False)
    serialNum   = models.IntegerField(null=True)

class Service(models.Model):
    object              = models.ForeignKey(Object, on_delete=models.CASCADE)
    name                = models.CharField(max_length=255, default='')
    durationTime        = models.IntegerField(null=True) # in seconds ?
    lastServiceDate     = models.DateField()
    durationDistance    = models.IntegerField(null=True)
    lastServiceDistance = models.IntegerField(null=True)

class Component(models.Model):
    object              = models.ForeignKey(Object, on_delete=models.CASCADE)
    make                = models.CharField(max_length=255, default='')
    model               = models.CharField(max_length=255, default='')
    serialNum           = models.IntegerField(null=True)
    boughtDate          = models.DateField()
    consumedDate        = models.DateField()
    removedDate         =  models.DateField()
    maintenanceSchedule = models.IntegerField(null=True)
    maintenanceUnits    = models.CharField(max_length=255, default='')

