<template>
  <div>
    <label :for="name">
      <b>{{ label }}</b>
    </label>
    <div class="input-group mb-3">
      <span v-if="type === 'number'" class="input-group-text" :id="name"
        >R$</span
      >

      <input
        v-maska="mask"
        v-on="validate"
        class="form-control border-rounded-1 shadow-blue"
        :class="{
          'border-rounded-error shadow-error': !!errorMessage,
          'cursor-pointer': !!cursor,
        }"
        :readonly="readonly"
        :name="name"
        :type="type"
        v-model="value"
        :placeholder="placeholder"
      />
    </div>
    <p class="error-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
    <p class="help-message" v-show="successMessage">
      {{ successMessage }}
    </p>
  </div>
</template>

<script>
  import { watch, computed } from "vue";
  import { useField } from "vee-validate";
  import moment from "moment";

  export default {
    props: {
      readonly: { type: Boolean, default: false },
      mask: {
        type: String,
        default: ""
      },
      cursor: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: "text"
      },
      modelValue: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      successMessage: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: ""
      }
    },

    setup(props) {
      const { ...field } = useField(props.name, undefined, {
        validateOnValueUpdate: true,
        initialValue: props.modelValue
      });
      const validate = computed(() => {
        return {
          blur: field.handleChange,
          change: [field.handleChange],
          input: [field.handleChange]
        };
      });
      function valueWatch(value) {
        if (props.type === "date") {
          field.value.value = convertDateTime(value);
        } else {
          field.value.value = value;
        }
      }
      function convertDateTime(data) {
        if (data) return moment(data).format("YYYY-MM-DD");
        else return null;
      }
      watch(
        () => props.modelValue,
        value => {
          console.log(value);
          valueWatch(value);
          //field.value.value = valueComputed;
        }
      );
      return {
        ...field,
        validate
      };
    }
  };
</script>

<style  scoped>
.input-group-text {
  padding: 0.15rem 0.75rem !important;
  background-color: #bcc1ce;
}
.error-message {
  color: #f02c2c;
  margin-bottom: 0;
  margin-top: -10px;
}
</style>
