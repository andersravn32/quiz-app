import { ref, shallowRef } from "vue";

const component = shallowRef(null);
const show = ref(false);

export default () => {
  const toggle = () => {
    show.value = !show.value;
    if (!show.value) {
      component.value = null;
    }
  };

  const setComponent = (comp) => {
    component.value = comp;
    return component.value;
  };

  const getComponent = () => {
    return component.value;
  };
  return { toggle, getComponent, setComponent, show };
};
