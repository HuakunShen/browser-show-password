<script lang="ts">
  import ModeSelector from './lib/ModeSelector.svelte';
  import AutoModeCheckbox from './lib/AutoModeCheckbox.svelte';
  import CopyOnDoubleClickCheckbox from './lib/CopyOnDoubleClickCheckbox.svelte';
  import Instructions from './lib/Instructions.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import { onMount } from 'svelte';

  let active = 'Home';

  const sendCmd = (cmd) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { cmd });
    });
  };

  onMount(() => {
    chrome?.storage?.sync?.get(['autoMode', 'mode'], (result) => {
      sendCmd(result.mode);
    });
  });
</script>

<main>
  <h1>Password Peeper</h1>
  <TabBar tabs={['Home', 'Instructions']} let:tab bind:active>
    <Tab {tab}>
      <Label>{tab}</Label>
    </Tab>
  </TabBar>

  {#if active === 'Home'}
    <ModeSelector />
    <AutoModeCheckbox />
    <CopyOnDoubleClickCheckbox />
  {:else if active === 'Instructions'}
    <Instructions />
  {:else}
    <h2>Unexpected Page</h2>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    min-width: 30rem;
    max-width: 0rem;
    margin: 0 auto;
    padding-bottom: 5rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
