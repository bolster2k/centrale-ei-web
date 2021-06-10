<template></template>
<script>
import axios from "axios";

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default {
  name: "UserLog",
  props: {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  },
  methods: {
    connectUserCookie: function (c_email, c_password) {
      document.cookie = "user=" + c_email + "; password=" + c_password + ";";
      console.log("In UserLog...");
      axios
        .post(`http://localhost:3000/users/connect`, {
          email: c_email,
          password: c_password,
        })
        .then((response) => {
          userlist = response.body.user;
          if (userlist.length <= 0) {
            return false;
          } else {
            this.password = c_password;
            this.email = c_email;

            this.firstname = userlist[0].firstname;
            this.lastname = userlist[0].lastname;

            console.log("User connected sucessfuly");
            console.log(this);
            return true;
          }
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while connecting.";
          console.error(error);
          return false;
        });
    },

    disconnectUserCookie: function (email, password) {
      document.cookie = "user=; password=;";
      console.log("User disconnected successfuly");
    },

    isConnectedCookie: function () {
      c_email = getCookie("user");
      c_password = getCookie("password");

      axios
        .post(`http://localhost:3000/users/connect`, {
          email: c_email,
          password: c_password,
        })
        .then((response) => {
          userlist = response.body.user;
          if (userlist.length <= 0) {
            console.log("User disconnected");
            return false;
          } else {
            console.log("User connected");
            return true;
          }
        })
        .catch((error) => {
          this.usersLoadingError =
            "An error occured while assessing connection.";
          console.error(error);
          console.log("User disconnected");
          return false;
        });
    },
  },
};
</script>
<style scoped></style>
