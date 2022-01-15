<script lang="ts">
  import Radio from '@smui/radio';
  import FormField from '@smui/form-field';
  import { onMount } from 'svelte';
  import { sendCmd } from '../utils';

  const DISABLE = 'Disable';
  const defaultMode = DISABLE;
  let ignoreFirstUpdateCount = 0;
  let options = [
    { name: DISABLE, disabled: false },
    { name: 'Mouse Over', disabled: false },
    { name: 'Display Directly', disabled: false },
  ];
  let mode = defaultMode;

  // Init
  onMount(() => {
    chrome?.storage?.sync?.get(['mode', 'autoMode'], (result) => {
      mode = result.mode == undefined ? defaultMode : result.mode;
    });
  });

  // Methods
  const modeChanged = () => {
    if (ignoreFirstUpdateCount === 0) {
      ignoreFirstUpdateCount += 1;
      return;
    }
    chrome?.storage?.sync?.set({ mode }).then(() => {
      chrome?.storage?.sync?.get(['mode', 'autoMode'], (result) => {});
      sendCmd(mode);
    });
  };

  // Watch
  $: mode, modeChanged();
</script>

<div class="radio-demo">
  {#each options as option}
    <FormField>
      <Radio bind:group={mode} value={option.name} disabled={option.disabled} />
      <span slot="label">
        {option.name}{option.disabled ? ' (disabled)' : ''}
      </span>
    </FormField>
  {/each}
</div>

<style>
  .radio-demo > :global(*) {
    margin: 0 0.2em;
  }
</style>
