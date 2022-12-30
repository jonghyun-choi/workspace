# Commandlines

```shell
$ gsutil list                           # 나의 버킷 리스트 보기
$ gsutil ls -r gs://버킷이름             # 버킷 안에 들어있는 파일 확인
$ gsutil du -s gs://버킷이름             # 버킷 용량 확인
$ gsutil mb gs://버킷이름                # 버킷 생성
$ gsutil rb gs://버킷이름                # 버킷 삭제
$ gsutil cp 로컬 파일 위치 gs://버킷이름   # 로컬 -> 버킷 복사
$ gsutil cp gs://버킷이름 로컬 파일 위치   # 버킷 -> 로컬 복사
$ gsutil mv 로컬 파일 위치 gs://버킷이름   # 로컬 -> 버킷 이동
$ gsutil mv gs://버킷이름 로컬 파일 위치   # 버킷 -> 로컬 이동
$ gsutil rm gs://버킷이름/파일이름        # 파일 삭제
$ gsutil ls -L gs://버킷이름/파일이름     # 파일 정보 보기
```

C:/Users/jonghyun/Downloads/OneDrive_2022-12-12.zip
gs://gcs-an3-nff-ptl-dev-temp/
C:/Pantos_Portal/workspace/portal_app/src/main/resources/gcp/pjt-pantos-nff-dev-2106-1-698716898092.json

gsutil cp C:/Users/jonghyun/Downloads/OneDrive_2022-12-12.zip gs://gcs-an3-nff-ptl-dev-temp/

gsutil signurl -d 100m C:/Pantos_Portal/workspace/portal_app/src/main/resources/gcp/pjt-pantos-nff-dev-2106-1-698716898092.json gs://gcs-an3-nff-ptl-dev-temp/OneDrive_2022-12-12.zip