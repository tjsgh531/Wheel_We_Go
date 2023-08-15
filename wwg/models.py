from django.db import models

# Create your models here.


##########################
### 유저 데이터 모델  ###
##########################
class kakaoUsers(models.Model):
    user_id = models.CharField(max_length= 255,primary_key=True)
    user_email = models.EmailField(max_length=255, null=True)
    user_coin = models.IntegerField(default=0)

    def __str__(self):
        return self.user_id
'''
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core.mail import send_mail
from django.utils import timezone
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _
class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, email, **extra_fields):
        email = email
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.save(using=self.db)
        return user
    
    def create_user(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('is_staff=True일 필요가 있습니다.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('is_superuser=True일 필요가 있습니다.')
        return self._create_user(username, email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):

    username = models.CharField(_("username"), max_length=50)
    email = models.EmailField(_("email_address"), unique=True)
    coin = models.IntegerField(default = 0)
    is_staff = models.BooleanField(_("staff status"), default=False)
    is_active = models.BooleanField(_("active"), default=True)

    objects = UserManager()
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
'''
###########################
### 이동기록 데이터 모델  ###
###########################
class Records(models.Model):
    records_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(kakaoUsers, on_delete=models.CASCADE)
    start_location = models.CharField(max_length=255, null=True)
    end_location = models.CharField(max_length=255, null=True)
    TIME = models.TimeField(null=True)
    feedback = models.CharField(max_length=255, null=True)
    credits_earned = models.IntegerField(null=True)
    record_date = models.DateTimeField(null=True)
    data_valid = models.IntegerField(choices=[(0, '0'), (1, '1'), (2, '2')], null=True)
    km = models.IntegerField(null=True)
    
    
    def __str__(self):
        return f"Record {self.records_id}: {self.start_location} to {self.end_location}"


#######################################
###  지역별 총 이동거리와 데이터 개수 ###
#######################################
class Regions(models.Model):
    regions = models.CharField(primary_key=True, max_length=255)
    kms = models.IntegerField(null=True)
    stacks = models.IntegerField(default=0)

#########################################
###   기록한 유저가 fk인 마킹 기록      ###
#########################################
class Markings(models.Model):
    AutoField = models.AutoField(primary_key=True)
    records_id = models.ForeignKey(Records, on_delete=models.CASCADE, related_name='markings_records')
    user_id = models.ForeignKey(kakaoUsers, on_delete=models.CASCADE, related_name='markings_user')
    marking_number = models.IntegerField(null=True)