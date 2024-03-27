<svelte:options customElement="minimal-calendar" />

<script lang="ts">
  const today = new Date();

  let current = today;
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
      ◀︎
    </button>
    <button class="current" on:click={() => current = today}>
      {`${year} - ${`00${month + 1}`.slice(-2)}`}
    </button>
    <button class="arrow" on:click={next}>
      ▶︎
    </button>
  </div>
  <div class="calendar-body">
    <div class="table weekdays">
      {#each ['S','M','T','W','T','F','S'] as weekday}        
        <div 
          class="column"
        >
          {weekday}
        </div>
      {/each}
    </div>
    <div class="table dates">
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
  button {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    background-color: inherit;
    border-width: 0;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .calendar {
    color: rgb(66,66,66);
    max-width: 400px;
    font-size: inherit;
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
  .table.weekdays {
    font-size: 0.75em;
    border-bottom: 1px solid rgb(198,198,198);
  }
  .arrow,
  .column {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    aspect-ratio: 1 / 1;
  }
  .arrow {
    width: calc(100% / 7);
  }
  .today {
    color: #fff;
    background-color: rgb(66,66,66);
    border-radius: 100%;
  }
  .column:nth-of-type(7n) {
    color: rgb(96, 139, 168);
  }
  .column:nth-of-type(7n+1) {
    color: rgb(168, 96, 139);
  }
</style>