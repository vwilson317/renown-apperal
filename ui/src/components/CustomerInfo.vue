<template>
<div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input type="text" class="form-control" id="firstName" placeholder value required />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder value required />
              <div class="invalid-feedback">Valid last name is required.</div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">
              Email
              <span class="text-muted">(Optional)</span>
            </label>
            <input type="email" class="form-control" id="email" placeholder="you@example.com" />
            <div class="invalid-feedback">Please enter a valid email address for shipping updates.</div>
          </div>
          </div>    
</template>