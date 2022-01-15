<script lang="ts">
  import Checkbox from '@smui/checkbox';
  import FormField from '@smui/form-field';
  import Tooltip, { Wrapper } from '@smui/tooltip';
  import { onMount } from 'svelte';

  let autoMode = false;

  const sendCmd = (cmd) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { cmd });
    });
  };

  onMount(() => {
    chrome?.storage?.sync?.get(['autoMode', 'mode'], (result) => {
      console.log(`autoMode init: ${result.autoMode}`);
      autoMode = result.autoMode == null ? false : result.autoMode;
      if (result.autoMode) sendCmd(result.mode);
    });
  });

  const checkboxUpdate = () => {
    autoMode = !autoMode;
    console.log(`autoMode: ${autoMode}`);
    chrome?.storage?.sync?.set({ autoMode });
  };

  //   $: autoMode, checkboxUpdate();
</script>

<FormField>
  <Wrapper>
    <FormField>
      <Checkbox on:click={checkboxUpdate} bind:checked={autoMode} touch />
      <span slot="label" tabindex="0">Auto Mode</span>
    </FormField>
    <Tooltip unbounded>Attempt to Trigger Automatically</Tooltip>
  </Wrapper>
</FormField>
