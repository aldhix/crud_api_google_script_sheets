#  CRUD Rest API Google Script & Sheets
CRUD  Rest API dengan Google Script menyimpan ke Google Sheets.

Contoh discript ini menggunakan 2 colom google sheets. Direkomendasikan membuat google script tidak menggunakan akun Distrik.

## URL

### Mendapatkan semua data (GET):
```
GET {{url_google_script_web}}?action=get
```

### Menambahkan data baru (POST):
```
POST {{url_google_script_web}}
Tipe Konten: application/x-www-form-urlencoded

Parameters:
action=add
name=John
gender=Male
```

### Memperbarui data (POST):
```
POST {{url_google_script_web}}
Tipe Konten: application/x-www-form-urlencoded

Parameters:
action=update
rowIndex=2
name=Jane
gender=Female
```

### Menghapus data (GET atau POST):
```
GET {{url_google_script_web}}?action=delete&rowIndex=2
```
