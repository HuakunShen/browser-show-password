<script lang="ts">
  import Checkbox from '@smui/checkbox';
  import FormField from '@smui/form-field';
  import Tooltip, { Wrapper, Content } from '@smui/tooltip';
  import { onMount } from 'svelte';
  import { sendCmd } from '../utils';
  let copyOnDoubleClick = false;

  onMount(() => {
    chrome?.storage?.sync?.get(['copyOnDoubleClick'], (result) => {
      copyOnDoubleClick = result.copyOnDoubleClick == null ? false : result.copyOnDoubleClick;
    });
  });

  const checkboxUpdate = () => {
    copyOnDoubleClick = !copyOnDoubleClick;
    chrome?.storage?.sync?.set({ copyOnDoubleClick }).then(() => {
      sendCmd(copyOnDoubleClick ? 'copyOnDoubleClick' : 'disableCopyOnDoubleClick');
    });
  };

  //   $: autoMode, checkboxUpdate();
</script>

<FormField>
  <Wrapper>
    <FormField>
      <Checkbox on:click={checkboxUpdate} bind:checked={copyOnDoubleClick} touch />
      <span slot="label" tabindex="0">Copy On Double Click</span>
    </FormField>
    <Tooltip yPos="above" unbounded>Copy Password On Double Click</Tooltip>
  </Wrapper>
</FormField>
