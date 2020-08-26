var html = '';

//modal to create dishes
html += `
    <div class="modal fade" id="cd" tabindex="-1" role="dialog"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New dish</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="cd-form">
              <div class="form-group">
                <label for="cd-name">Name</label>
                <input class="form-control" id="cd-name" type="text"
                  autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="cd-description">Description</label>
                <textarea class="form-control" id="cd-description" rows="3"
                  required></textarea>
              </div>
              <div class="form-group">
                <label for="cd-image">Image</label>
                <input class="form-control" id="cd-image" type="file"
                  autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="cd-price">Price</label>
                <input class="form-control" id="cd-price" type="number"
                  min="1" autocomplete="off" required>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="cd-unavailable" value="1" checked="checked">
                <label class="form-check-label" for="cd-unavailable">Unavailable</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="cd-available" value="2">
                <label class="form-check-label" for="cd-available">Available</label>
              </div>
              <button type="submit" id="fake-cd-create" style="display: none;"></button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" id="cd-create">
              Save</button>
          </div>
        </div>
      </div>
    </div>
`;

//modal to modify dishes
html += `
    <div class="modal fade" id="md" tabindex="-1" role="dialog"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modify dish</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="md-form">
              <div class="form-group">
                <label for="md-name">Name</label>
                <input class="form-control" id="md-name" type="text"
                  autocomplete="off" required>
              </div>
              <div class="form-group">
                <label for="md-description">Description</label>
                <textarea class="form-control" id="md-description" rows="3"
                  required></textarea>
              </div>
              <div class="form-group">
                <label for="md-image">Image (optional)</label>
                <input class="form-control" id="md-image" type="file"
                  autocomplete="off">
              </div>
              <div class="form-group">
                <label for="md-price">Price</label>
                <input class="form-control" id="md-price" type="number"
                  min="1" autocomplete="off" required>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="md-unavailable" value="1" checked="checked">
                <label class="form-check-label" for="md-unavailable">Unavailable</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="md-available" value="2">
                <label class="form-check-label" for="md-available">Available</label>
              </div>
              <button type="submit" id="fake-md-modify" style="display: none;"></button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" id="md-modify">
              Save</button>
          </div>
        </div>
      </div>
    </div>
`;

//modal to delete dishes
html += `
    <div class="modal fade" id="dd" tabindex="-1" role="dialog"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete dish</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" id="dd-delete">
              Delete</button>
          </div>
        </div>
      </div>
    </div>
`;

document.querySelector('#modal-template').innerHTML = html;