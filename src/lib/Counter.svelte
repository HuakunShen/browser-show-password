<script>
  import Button from '@smui/button';
  let count = 0
  const increment = () => {
    count += 1
  }
</script>
<Button on:click={increment}>Clicks: {count}</Button>
