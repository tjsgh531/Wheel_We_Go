from rest_framework import serializers
from .models import kakaoUsers, Regions, saveRecord


### 모델마다 모든 레코드의 CRUD Serializer ###
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = kakaoUsers
        fields = '__all__'


class RegionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Regions
        fields = '__all__'

class saveRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = saveRecord
        fields = '__all__'


class EarnedCoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = kakaoUsers
        fields = ['user_coin']

class SaveRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = saveRecord
        fields = ['user_id', 'earnedCoin', 'info']


# class saveSerializer(serializers.Serializer):
#     user_id = serializers.IntegerField(read_only=True)
#     earnedCoin = serializers.IntegerField(allow_blank=True,max_length = 100)
#     info = serializers.JSONField(allow_blank = True,allow_null =True)
    
#     def create(self,validated_data):
#         return saveRecord.objects.create(**validated_data)