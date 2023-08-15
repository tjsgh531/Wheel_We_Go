# Generated by Django 4.2.4 on 2023-08-15 16:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wwg', '0002_alter_regions_kms_saverecord'),
    ]

    operations = [
        migrations.AlterField(
            model_name='records',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]