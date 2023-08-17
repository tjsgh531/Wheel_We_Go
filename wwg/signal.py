from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from .models import kakaoUsers, Regions, saveRecord
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(user_logged_in)
def save_kakao_user(sender, request, user, **kwargs):
    # 카카오 사용자 정보가 있는 경우만 처리
    if user.socialaccount_set.filter(provider='kakao').exists():
        # 최초 로그인 시에만 coin을 0으로 초기화
        if not kakaoUsers.objects.filter(user_id=user.username).exists():
            kakao_user = kakaoUsers.objects.create(
                user_email=user.email,
                user_id=user.username,
                user_coin=0
            )

import json
from django.db import transaction
from django.db.utils import IntegrityError 
@receiver(post_save, sender=saveRecord)
def update_regions(sender, instance, created, **kwargs):
    newSaveRecord = instance.info
    # newSaveRecord = json.loads(newSaveRecord)
    try: ## 기존 데이터베이스에 있는 부분이면 저장시키기
        regions_instance = Regions.objects.get(regions=newSaveRecord.get("startName"))
        regions_instance.kms += newSaveRecord.get("distance")
        regions_instance.stacks += 1
        regions_instance.save()
    except Regions.DoesNotExist:
        with transaction.atomic(): ## 통째로 저장시키는 것(무결성 문제 피하기 위함)
            try: ## 새로운(해당 동이 없는) 데이터 저장시키기
                Regions.objects.create(
                    regions=newSaveRecord.get("startName"),
                    kms=newSaveRecord.get("distance"),
                    stacks=1
                )
            except IntegrityError:
                pass


## 지워도 됨
# @receiver(post_save, sender=saveRecord)
# def update_regions(sender, instance, created, **kwargs):
#     newSaveRecord = instance.info
#     try:
#         regions_instance = Regions.objects.get(regions=newSaveRecord.get("startpoint"))
#         regions_instance.regions = newSaveRecord.get("startName")
#         regions_instance.kms += newSaveRecord.get("distance")
#         regions_instance.stacks += 1
#         regions_instance.save()
#     except Regions.DoesNotExist:
#         Regions.objects.create(
#             regions=newSaveRecord.get("startName"),
#             kms=newSaveRecord.get("distance"),
#             stacks=1
#         )