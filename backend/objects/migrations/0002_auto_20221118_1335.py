# Generated by Django 3.2.5 on 2022-11-18 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('objects', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='object',
            name='make',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='object',
            name='model',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='object',
            name='nickname',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='object',
            name='type',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
