<template>
  <div>
    <div>
      <div class="card-deck">
        <div class="card bg-light">
          <img class="card-img-top" src="@/assets/images/userlist.jpg" alt="Card image" />
          <div class="card-body">
            <h4 class="card-title text-center text-primary">لیست کاربران</h4>
            <div @click="goToPage('users')" class="btn btn-primary btn-block">نمایش</div>
          </div>
          <div class="card-body text-center">
            <p class="card-text">USERs INFO</p>
          </div>
        </div>
        <div class="card bg-light">
          <img class="card-img-top" src="@/assets/images/booklist.jpg" alt="Card image" />          
          <div class="card-body text-center">
            <h4 class="card-title text-center text-primary">لیست کتاب ها</h4>
            <div @click="goToPage('books')" class="btn btn-primary btn-block">نمایش</div>
            <p class="card-text">Some text inside the first card</p>
          </div>
        </div>
        <div class="card bg-light">
          <img class="card-img-top" src="@/assets/images/questionList.jpg" alt="Card image" />          
          <div class="card-body text-center">
            <h4 class="card-title text-center text-primary">لیست سوالات</h4>
            <div @click="goToPage('questions')" class="btn btn-primary btn-block">نمایش</div>
            <p class="card-text">Some text inside the first card</p>
          </div>
        </div>
         <div class="card bg-light">
          <img class="card-img-top" src="@/assets/images/schoolList.jpg" alt="Card image" />          
          <div class="card-body text-center">
            <h4 class="card-title text-center text-primary">لیست مدارس</h4>
            <div @click="goToPage('schools')" class="btn btn-primary btn-block">نمایش</div>
            <p class="card-text">Some text inside the first card</p>
          </div>
        </div>
      </div>
      <div class="card-deck mt-5">
        <div class="card bg-light">
          <div class="card-body text-center">
            <p class="card-text">Some text inside the first card</p>
          </div>
        </div>
        <div class="card bg-warning">
          <div class="card-body text-center">
            <p class="card-text">Some text inside the second card</p>
          </div>
        </div>
        <div class="card bg-success">
          <div class="card-body text-center">
            <p class="card-text">Some text inside the third card</p>
          </div>
        </div>
        <div class="card bg-danger">
          <div class="card-body text-center">
            <p class="card-text">Some text inside the fourth card</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "admin",
  middleware:['checkadmin'],
  data(){return{}},
  methods:{
      goToPage(url){
          this.$router.push({
            path: "admin/"+url
          });
      }
  }
};
</script>
