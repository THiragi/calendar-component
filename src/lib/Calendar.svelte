<svelte:options customElement="minimal-calendar" />

<script lang="ts">
  const weekdays = ['S','M','T','W','T','F','S'];
  
  const today = new Date();

  $: current = today;
  $: year = current.getFullYear();
  $: month = current.getMonth();
  $: start =  new Date(year, month, 1);
  $: end = new Date(year, month + 1, 0);

  $: dates = [
    ...[...Array(start.getDay())].map(() => null),
    ...[...Array(end.getDate())].map((_, i) => new Date(year, month, i + 1)),
    ...[...Array(42 - (start.getDay() + end.getDate()))].map(() => null)
  ]

  function prev() {
    current = new Date(year, month - 1, 1);
  }

  function next() {
    current = new Date(year, month + 1, 1);
  }
</script>

<div class="calendar">
  <div class="calendar-header">
    <button class="arrow" on:click={prev}>
      {`<`}
    </button>
    <div class="current">{`${year}年 ${month + 1}月`}</div>
    <button class="arrow" on:click={next}>
      {`>`}
    </button>
  </div>
  <div class="calendar-body">
    <div class="table">
      {#each weekdays as weekday}        
        <div 
          class="column"
        >
          {weekday}
        </div>
      {/each}
    </div>
    <div class="table date">
      {#each dates as date}
        <div 
          class="column"
          class:today={date && date.toDateString() === today.toDateString()}
          >
          {date?.getDate() ?? ''}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .calendar {
    width: 100%;
  }
  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .table {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .arrow,
  .column {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .column {
    height: auto;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
  }
  .arrow {
    width: calc(100% / 7);
  }
  
  .table.date {
    font-weight: bold;
  }
  .today {
    background-color: #1a1a1a;
  }
</style>