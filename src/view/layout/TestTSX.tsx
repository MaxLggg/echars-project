import { defineComponent } from "vue";


const HeaderView = defineComponent({
  name: "HeaderView",
  props: {
    label: {
      type: String,
      default: "HeaderView"
    }
  },
  setup(props) {
    return () => {
      return <div>HeaderView:{props.label}</div>
    }
  }
});

export default HeaderView