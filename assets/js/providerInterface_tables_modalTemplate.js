var html = '';

//modal to create tables
html += `
    <div class="modal fade" id="ct" tabindex="-1" role="dialog"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New table</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="ct-form">
              <div class="form-group">
                <label for="ct-name">Name</label>
                <input class="form-control" id="ct-name" type="text"
                  autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="ct-description">Description</label>
                <textarea class="form-control" id="ct-description" rows="3"
                  required></textarea>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="ct-unavaliable" value="1" checked="checked">
                <label class="form-check-label" for="ct-unavaliable">Unavailable</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="ct-avaliable" value="2">
                <label class="form-check-label" for="ct-avaliable">Available</label>
              </div>
              <button type="submit" id="fake-ct-create" style="display: none;"></button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" id="ct-create">
              Save</button>
          </div>
        </div>
      </div>
    </div>
`;

//modal to modify tables
html += `
    <div class="modal fade" id="mt" tabindex="-1" role="dialog"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modify table</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="mt-form">
              <div class="form-group">
                <label for="mt-name">Name</label>
                <input class="form-control" id="mt-name" type="text"
                  autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="mt-description">Description</label>
                <textarea class="form-control" id="mt-description" rows="3"
                  required></textarea>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="mt-unavaliable" value="1" checked="checked">
                <label class="form-check-label" for="mt-unavaliable">Unavailable</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="mt-avaliable" value="2">
                <label class="form-check-label" for="mt-avaliable">Available</label>
              </div>
              <button type="submit" id="fake-mt-modify" style="display: none;"></button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" id="mt-modify">
              Save</button>
          </div>
        </div>
      </div>
    </div>
`;

//modal to delete tables
html += `
    <div class="modal fade" id="dt" tabindex="-1" role="dialog"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete table</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" id="dt-delete">
              Delete</button>
          </div>
        </div>
      </div>
    </div>
`;

document.querySelector('#modal-template').innerHTML = html;