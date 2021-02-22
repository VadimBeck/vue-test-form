<template lang="pug">
  .register
    .register__header
      h1.register__title Регистрация
      .register__info
        span.register__info-text Уже есть аккаунт?
        a(href="#" @click.prevent).register__link Войти
    .regirster__form
      form(@submit.prevent="submitForm").form
        .form__row
          label.form__block
            .form__block-desc Имя
            input.form__input.form__entry(
              v-model="user.name"
              @blur="checkField('name', user.name)"
              @input="updateField('name', user.name)"
              type="text" 
              name="name" 
              placeholder="Введите ваше имя"
            )
          .error {{validator.name.error || ""}}
        .form__row
          label.form__block
            .form__block-desc Email
            input.form__input.form__entry(
              v-model="user.email" 
              @blur="checkField('email', user.email)"
              @input="updateField('email', user.email)"
              type="email" name="email" 
              placeholder="Введите ваш Email"
            )
          .error {{validator.email.error || ""}}
        .form__row
          label.form__block
            .form__block-desc Номер телефона
            input.form__input.form__entry(
              v-model="user.phone"
              @blur="checkField('phone', user.phone)"
              @input="updateField('phone', user.phone)"
              type="tel" 
              name="phone" 
              placeholder="Введите номер телефона"
            )
          .error {{validator.phone.error || ""}}
        .form__row
          .form__block-desc Язык
          .select(:class="{'is-active' : openSelect}")
            .select__input.form__entry(
              @click="toggleSelect"
              @keydown.enter="toggleSelect"
              v-model="user.language"
              tabindex="0"
              :class="{'select__input--active' : user.language}"
              ) {{user.language ? user.language : "Язык"}}
            ul.select__dropdown
              li.select__option(
                v-for="language in languages" 
                :key="language"
                tabindex="0"
                @click="selectLanguage(language)"
              ) {{language}}
        .form__row
          .form__accept
            label.form__accept-label
              input(type="checkbox" v-model="checked").form__checkbox
              span.form__accept-text
                | Принимаю 
                a(href="#" @click.prevent).register__link условия 
                | использования
        .form__buttons
          button.form__button(type="submit" :disabled="!validForm") Зарегистрироваться          
</template>

<script>
import validator from "../mixins/validator.js";

export default {
  mixins: [validator],
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        language: null,
      },
      checked: false,
      openSelect: false,
      languages: ["Русский", "Английский", "Китайский", "Испанский"],
    };
  },
  computed: {
    validForm() {
      return (this.checked && this.validateSuccess()) || false;
    },
  },
  methods: {
    toggleSelect() {
      this.openSelect = !this.openSelect;
    },
    selectLanguage(val) {
      this.user.language = val;
      this.openSelect = false;
    },
    submitForm() {},
  },
};
</script>

<style lang="scss" scoped>
.register {
  color: #756f86;
  width: 85%;
  max-width: 450px;
  margin: 10px auto;
  padding: 30px;
  border-radius: 24px;
  background: #fff;
}

.register__header {
  margin-bottom: 30px;
}

.register__title {
  color: #2c2738;
  margin: 0 0 10px 0;
}

.register__info-text {
  margin-right: 5px;
}

.register__link {
  text-decoration: none;
  color: #0880ae;
}

.form__row {
  position: relative;
  margin-bottom: 25px;
}

.form__entry {
  padding: 10px;
  border: 1px solid #dbe2ea;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
  font-size: inherit;
  outline: none;
  transition: border 0.2s;

  &:focus,
  &:active {
    border-color: #0880ae;
  }
}

.form__input {
  width: 100%;
}

.form__block {
  display: block;
}

.form__block-desc {
  margin-bottom: 5px;
}

.select {
  position: relative;
  &.is-active {
    .select__input {
      border-color: #0880ae;
      color: #000;
    }
    .select__dropdown {
      visibility: visible;
      opacity: 1;
      transition: opacity ease 0.2s;
    }
  }
}

.select__dropdown {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  background: #fff;
  cursor: pointer;
  z-index: 1;
  border-radius: 6px;
  width: 100%;
  left: 0;
  top: 104%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #dbe2ea;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
}

.select__option {
  padding: 10px;
  list-style: none;
  outline: none;

  &:hover, &:focus, &:active {
    background: #ebf4f8;
  }
}

.select__input {
  position: relative;
  cursor: pointer;

  &::after {
    content: "❯";
    color: #0880ae;
    position: absolute;
    right: 10px;
    transform: rotate(90deg);
  }

  &--active {
    color: #000;
  }
}

.form__accept-label {
  display: block;
  padding: 12px 0;
}

.form__accept-text {
  margin-left: 20px;
}

.form__checkbox {
  visibility: hidden;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    visibility: visible;
    display: block;
    cursor: pointer;
  }
  &:before {
    width: 24px;
    height: 24px;
    left: 0;
    bottom: -6px;
    display: block;
    border: 1px solid #0880ae;
    border-radius: 2px;
  }
  &:after {
    left: 9px;
    bottom: 3px;
    width: 6px;
    height: 12px;
    border: solid transparent;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  &:checked {
    &::after {
      border-color: #0880ae;
    }
  }
}

.form__button {
  width: 100%;
  background-color: #0880ae;
  transition: background 0.25s;
  font-size: inherit;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 6px;
  padding: 15px 0;
  color: #fff;

  &:disabled {
    background: #dbe2ea;
    color: #b1b5bf;
  }
}
.error {
  position: absolute;
  bottom: -18px;
  color: red;
  font-size: 14px;
}
</style>
