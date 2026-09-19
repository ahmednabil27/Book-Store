<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="footer ">
      <div class="container">
          <div class="box">
              <h3>Book Store</h3>
              <ul class="social">
                  <li>
                      <a href="#" class="facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#" class="twitter">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#" class="youtube">
              <i class="fab fa-youtube"></i>
            </a>
          </li>
        </ul>
        <p class="text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
          nulla rem, dignissimos iste aspernatur
        </p>
      </div>
      <div class="box">
        <ul class="links">
          <li><RouterLink to="/">  <button>Home</button> </RouterLink></li>
          <li><RouterLink to="/about"> <button>About</button>  </RouterLink></li>
          <li><RouterLink>  <button>Help</button> </RouterLink></li>
          <li><RouterLink>   <button>Create a new acount</button></RouterLink></li>
          <li><RouterLink> <button>Login</button>  </RouterLink></li>
        </ul>
      </div>
      <div class="box">
        <div class="line">
          <i class="fas fa-map-marker-alt fa-fw"></i>
          <div class="info">
            Egypt, Giza, Inside The Sphinx, Room Number 220
          </div>
        </div>
        <div class="line">
          <i class="far fa-clock fa-fw"></i>
          <div class="info">Business Hours: From 10:00 To 18:00</div>
        </div>
        <div class="line">
          <i class="fas fa-phone-volume fa-fw"></i>
          <div class="info">
            <span>+20123456789</span>
            <span>+20198765432</span>
          </div>
        </div>
      </div>
    </div>
    <p class="copyright">Made With &lt;3 By Elzero</p>
  </div>
</template>

<style scoped>
.footer {
  background-color: #191919;
  padding: 70px 0 0;
  --main-transition: .3s;
}
@media (max-width: 767px) {
  .footer {
    text-align: center;
  }
}
.footer .container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px;
}
.footer .box h3 {
  color: white;
  font-size: 50px;
  margin: 0 0 20px;
}
.footer .box .social {
  display: flex;
}
@media (max-width: 767px) {
  .footer .box .social {
    justify-content: center;
  }
}
.footer .box .social li {
  margin-right: 10px;
}
.footer .box .social li a {
  background-color: #313131;
  color: #b9b9b9;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 20px;
  transition: var(--main-transition);
}
.footer .box .social .facebook:hover {
  background-color: #1877f2;
}
.footer .box .social .twitter:hover {
  background-color: #1da1f2;
}
.footer .box .social .youtube:hover {
  background-color: #ff0000;
}
.footer .box .text {
  line-height: 2;
  color: #b9b9b9;
}
.footer .box .links li {
  padding: 15px 0;
  transition: var(--main-transition);
}
.footer .box .links li:not(:last-child) {
  border-bottom: 1px solid #444;
}
.footer .box .links li:hover {
  padding-left: 10px;
}
.footer .box .links li:hover button {
  color: white;
}
.footer .box .links li button {
  background-color: transparent;
  border:none;
  color: #b9b9b9;
  transition: var(--main-transition);
}
.footer .box .links li button::before {
  font-family: "Font Awesome 5 Free";
  content: "\F101";
  font-weight: 900;
  margin-right: 10px;
  color: var(--main-color);
}
.footer .box .line {
  display: flex;
  align-items: center;
  color: #b9b9b9;
  margin-bottom: 30px;
}
@media (max-width: 767px) {
  .footer .box .line {
    flex-direction: column;
  }
}
.footer .box .line i {
  font-size: 25px;
  color: var(--main-color);
  margin-right: 10px;
}
@media (max-width: 767px) {
  .footer .box .line i {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
.footer .box .line .info {
  line-height: 1.7;
  flex: 1;
}
.footer .box .line .info span {
  display: block;
}
.footer .footer-gallery img {
  width: 78px;
  border: 3px solid white;
  margin: 2px;
}
.footer .copyright {
  padding: 25px 0;
  text-align: center;
  color: white;
  margin: 50px 0 0;
  border-top: 1px solid #444;
}
/* End Footer */
</style>
