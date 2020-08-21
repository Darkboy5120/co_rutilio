var html = '';

//modal to set orders date
html += `
    <div class="modal fade" id="on" tabindex="-1" role="dialog"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Set your reservation's date</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="on-form">
              <div class="form-group">
                <label for="on-name">Date</label>
                <input class="form-control" id="on-date" type="datetime-local"
                  autocomplete="off" required>
              </div>
              <button type="submit" id="fake-on-create" style="display: none;"></button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" id="on-create">
              Order</button>
          </div>
        </div>
      </div>
    </div>
`;

document.querySelector('#modal-template').innerHTML = html;