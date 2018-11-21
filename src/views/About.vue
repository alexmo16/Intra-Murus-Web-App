<template>
  <div class="about">
    <h3 class="header-text">Équipe de développement Intra-MurUS</h3>
    <div class="body">
      <p class="team-name">API</p>
      <p class="team-name">Mobile</p>
      <p class="team-name">Web</p>
      <div class ="teammember">
        <b-img class="img1" rounded="circle" width="100" height="100" :src="require('../assets/zucc.png')" />
        <p>Patrick Beaulieu</p>
      </div>
      <div class ="teammember">
        <b-img class="img3" rounded="circle" width="100" height="100" :src="require('../assets/zucc.png')" />
        <p>Mathieu Favreau</p>
      </div>
      <div class ="teammember">
        <b-img class="img5" rounded="circle" width="100" height="100" :src="require('../assets/zucc.png')" />
        <p>Alexis Morel</p>
      </div>
      <div class ="teammember">
        <b-img class="img2" rounded="circle" width="100" height="100" :src="require('../assets/zucc.png')" />
        <p>Walid Madaoui</p>
      </div>
      <div class ="teammember">
        <b-img class="img4" rounded="circle" width="100" height="100" :src="require('../assets/zucc.png')" />
        <p>Yanik Gobeil</p>
      </div>
      <div class ="teammember">
        <b-img class="img6" rounded="circle" width="100" height="100" :src="require('../assets/zucc.png')" />
        <p>Félix Roy</p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import (reference) "../GlobalStyles.less";

.about {
  display: inline;

  .header-text {
    margin: 20px;
  }
}

.body {
  display: grid;
  grid-template-columns: auto auto auto;

  .team-name {
    font-size: 30px;
  }

  .img1 {
    transform: rotate(-45deg);
  }

  .img2 {
    transform: rotate(0deg);
  }

  .img3 {
    transform: rotate(45deg);
  }

  .img4 {
    transform: rotate(135deg);
  }

  .img5 {
    transform: rotate(180deg);
  }

  .img6 {
    transform: rotate(225deg);
  }
}

@media screen and (max-width: 600px) {
  .body {
    display: inline;
  }
}
</style>

<script>
export default {
  name: "about",
  data: function() {
    return {
      username: ""
    };
  }
};
</script>
