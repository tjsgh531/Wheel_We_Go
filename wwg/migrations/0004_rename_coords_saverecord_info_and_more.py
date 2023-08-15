# Generated by Django 4.2.4 on 2023-08-15 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wwg', '0003_alter_records_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='saverecord',
            old_name='coords',
            new_name='info',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='AtTime',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='data_valid',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='earned_coin',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='endName',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='endpoint',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='km',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='markings',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='startName',
        ),
        migrations.RemoveField(
            model_name='saverecord',
            name='startpoint',
        ),
        migrations.AddField(
            model_name='saverecord',
            name='earnedCoin',
            field=models.IntegerField(default=0),
        ),
    ]
