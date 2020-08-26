var html = '';

//modal to set orders date
html += `
    <div class="modal fade" id="mp" tabindex="-1" role="dialog"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modify profile</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="mp-form">
              <div class="form-group">
                <label for="mp-username">Username</label>
                <input class="form-control" id="mp-username" type="text"
                  minlength="5" maxlength="50"
                  autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="mp-phone">Phone</label>
                <input class="form-control" id="mp-phone" type="text"
                  minlength="10" maxlength="10"
                  autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="mp-image">Image (optional)</label>
                <input class="form-control" id="mp-image" type="file"
                  autocomplete="off">
              </div>
              <button type="submit" id="fake-mp-modify" style="display: none;"></button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" id="mp-modify">
              Save changes</button>
          </div>
        </div>
      </div>
    </div>
`;

document.querySelector('#modal-template').innerHTML = html;