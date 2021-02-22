const validator = {
  data() {
    return {
      validator: {
        name: {
          error: "",
          valid: false,
        },
        email: {
          error: "",
          valid: false,
        },
        phone: {
          error: "",
          valid: false,
        },
      },
    };
  },
  methods: {
    checkField(name, value) {
      let re;
      switch (name) {
        case "name":
          re = /^[а-я]{1}[а-я-]+([а-я]| ){1}[а-я-]+$/i;
          break;
        case "email":
          re = /^[\w]{1}[\w-]*@[\w-]+\.[a-z]{2,4}$/;
          break;
        case "phone":
          re = re = /^[+]?[0-9]{1}[ -]?\(?([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{4})$/;
          break;
      }
      if (!re.test(value)) {
        this.validator[name].error = "Введено не корректное значение";
        return false;
      }
      return true;
    },
    updateField(name, value) {
      if (this.checkField(name, value)) {
        this.validator[name].valid = true;
      } else {
        this.validator[name].valid = false;
      }
      this.validator[name].error = "";
    },
    validateSuccess() {
      return Object.values(this.validator).every((k) => k.valid);
    },
  },
};

export default validator;
