$(document).ready(function() {
  $('.sub-menu').hide(); // Ẩn danh sách con ban đầu
  $('.nav-link.link-body-emphasis').click(function(e) {
      e.preventDefault();
      $(this).next('.sub-menu').slideToggle(300); // Hiển thị/ẩn danh sách con khi nhấp vào danh mục
  });

  function loadDriveApi() {
      gapi.load('client', initClient);
  }

  function initClient() {
      gapi.client.init({
          apiKey: 'AIzaSyCwt9Dcmc_Vs0aPmWssTkhRdM-Df_Gsg3A', // Thay YOUR_API_KEY bằng API key của bạn
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      }).then(function() {
          listPublicFolders();
      }).catch(function(error) {
          console.log('Error initializing the client: ' + error);
      });
  }

  function listPublicFolders() {
      gapi.client.drive.files.list({
          q: "mimeType='application/vnd.google-apps.folder' and visibility='public' and trashed=false",
          fields: 'files(id, name)',
      }).then(function(response) {
          var folders = response.result.files;
          var folderList = document.getElementById('folder-list');

          for (var i = 0; i < folders.length; i++) {
              var folder = folders[i];
              var folderLink = document.createElement('a');
              folderLink.href = 'https://drive.google.com/drive/folders/' + folder.id;
              folderLink.textContent = folder.name;
              folderList.appendChild(folderLink);
              folderList.appendChild(document.createElement('br'));
          }
      }).catch(function(error) {
          console.log('Error listing public folders: ' + error);
      });
  }

  loadDriveApi();
});
