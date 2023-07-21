// Deklarasi variabel global
var spreadsheetId = 'SPREADSHEET_ID';
var sheetName = 'SHEET_NAME';

// Fungsi untuk mengubah teks menjadi format camelCase dengan huruf pertama huruf kecil (lower camel case)
function toCamelCase(text) {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '');
}

// Fungsi untuk mendapatkan data dari lembar kerja
function getData() {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();

  var result = [];
  var headers = data[0];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};

    for (var j = 0; j < headers.length; j++) {
      var headerKey = toCamelCase(headers[j]); // Mengubah header menjadi camelCase
      obj[headerKey] = row[j];
    }

    result.push(obj);
  }

  return result;
}

// Fungsi untuk menambahkan data ke lembar kerja
function addData(name, gender) {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  sheet.appendRow([name, gender]);
}

// Fungsi untuk memperbarui data di lembar kerja berdasarkan indeks baris
function updateData(rowIndex, name, gender) {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  var rowToUpdate = rowIndex + 1; // Array dimulai dari 0, sedangkan indeks baris dimulai dari 1
  sheet.getRange(rowToUpdate, 1).setValue(name);
  sheet.getRange(rowToUpdate, 2).setValue(gender);
}

// Fungsi untuk menghapus data dari lembar kerja berdasarkan indeks baris
function deleteData(rowIndex) {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  var rowToDelete = rowIndex + 1; // Array dimulai dari 0, sedangkan indeks baris dimulai dari 1
  sheet.deleteRow(rowToDelete);
}

// Fungsi utama untuk menangani permintaan HTTP
function doPost(e) {
  var action = e.parameter.action;
  var name = e.parameter.name;
  var gender = e.parameter.gender;
  var rowIndex = Number(e.parameter.rowIndex) + 1; // Parameter rowIndex akan dikirim dalam bentuk string

  var response = {};

  if (action == 'get') {
    // Mendapatkan data dari lembar kerja menggunakan metode POST
    response.data = getData();
  } else if (action == 'add') {
    // Menambahkan data ke lembar kerja menggunakan metode POST
    addData(name, gender);
    response.message = 'Data berhasil ditambahkan.';
  } else if (action == 'update') {
    // Memperbarui data di lembar kerja menggunakan metode POST
    updateData(rowIndex, name, gender);
    response.message = 'Data berhasil diperbarui.';
  } else if (action == 'delete') {
    // Menghapus data dari lembar kerja menggunakan metode POST
    deleteData(rowIndex);
    response.message = 'Data berhasil dihapus.';
  } else {
    response.error = 'Aksi tidak valid.';
  }

  // Mengubah respons menjadi format JSON
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

// Fungsi untuk menangani permintaan HTTP dengan metode GET
function doGet(e) {
  var action = e.parameter.action;
  var rowIndex = Number(e.parameter.rowIndex) + 1; // Parameter rowIndex akan dikirim dalam bentuk string

  var response = {};

  if (action == 'get') {
    // Mendapatkan data dari lembar kerja menggunakan metode GET
    response.data = getData();
  } else if (action == 'delete') {
    // Menghapus data dari lembar kerja menggunakan metode GET
    deleteData(rowIndex);
    response.message = 'Data berhasil dihapus.';
  } else {
    response.error = 'Aksi tidak valid.';
  }

  // Mengubah respons menjadi format JSON
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}
