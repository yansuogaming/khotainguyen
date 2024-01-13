// Thay thế YOUR_CLIENT_ID bằng Client ID bạn đã nhận được từ bước 2
var CLIENT_ID = '148633961854-9g61vjq4hl25vop77uei23nmnmrrd4ak.apps.googleusercontent.com';

// Các phạm vi (scopes) cần truy cập từ Google Drive API
var SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// Hàm xử lý khi người dùng nhấp vào nút "Đăng nhập"
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

// Hàm xử lý sau khi xác thực thành công
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Xác thực thành công, gọi hàm loadDriveAPI để tải Google Drive API
    loadDriveAPI();
  }
}

// Hàm tải Google Drive API
function loadDriveAPI() {
  gapi.client.load('drive', 'v3', listFiles);
}

// Hàm lấy danh sách file và folder từ Google Drive API
function listFiles() {
  gapi.client.drive.files.list({
    'pageSize': 10, // Số lượng file/folder muốn lấy
    'fields': 'nextPageToken, files(id, name, mimeType)' // Các trường thông tin muốn lấy
  }).then(function(response) {
    var files = response.result.files;
    // Xử lý danh sách files tại đây
    console.log(files);
  });
}

// Khởi tạo gapi và xác thực
function initClient() {
  gapi.client.init({
    'clientId': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(function() {
    // Xác thực thành công, gọi hàm handleAuthResult
    gapi.auth2.getAuthInstance().isSignedIn().listen(handleAuthResult);
    handleAuthResult(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse());
  });
}

// Gọi hàm initClient khi thư viện gapi đã được tải
gapi.load('client:auth2', initClient);