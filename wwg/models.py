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