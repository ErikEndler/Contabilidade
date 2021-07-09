<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      class="form-control border-rounded-1 shadow-blue"
      ref="inputRef"
      :name="name"
      v-model="value"
      outlined
      label="Amount"
      placeholder="0,00"
    />
  </div>
</template>

<script>
  import useCurrencyInput from "vue-currency-input";
  import { useField } from "vee-validate";
  import { watch } from "vue";

  export default {
    name: "QCurrencyInput",
    props: {
      name: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      modelValue: Number,
      options: Object
    },
    setup(props) {
      const { inputRef, setValue } = useCurrencyInput(props.options);
      // const { errorMessage, value } = useField("amount", value => !!value);
      const { ...field } = useField(props.name, undefined, {
        validateOnValueUpdate: false,
        initialValue: props.value
      });

      watch(
        () => props.modelValue,
        value => {
          console.log(value);
          setValue(value);
        }
      );
      return { inputRef, ...field };
    }
  };
</script>
