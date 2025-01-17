---
title: US House Price Index 1991-2024
description: Displayed are indexed, non-seasonal adjusted house prices for the US and each state.
hide_title: true
---

# Vizualize Data from APIs

The data from this page is fetched from the [FHFA House Price Index](https://www.fhfa.gov/hpi/download/monthly/hpi_master.json) using the Evidence [JavaScript data source](https://docs.evidence.dev/core-concepts/data-sources/#javascript).

```code
https://www.fhfa.gov/hpi/download/monthly/hpi_master.json
```

```sql total_records
select count(*) as total_records from hpi.index
```

<BigValue
  data={total_records}
  value="total_records"
/>

```sql hpi_query
select 
yr,
period,
yr + (period-1)/4 as period_yr,
index_nsa,
index_sa,
 from hpi.index
where frequency = 'quarterly'
and level = 'USA or Census Division'
and place_name = 'United States'
and hpi_flavor = 'purchase-only'
```

```sql hpi_query_levels
select distinct level from hpi.index
```

<LineChart 
  data={hpi_query} 
  y="index_nsa" 
  x="period_yr" 
  sort=false 
  title="US House Prices, Index 1991 = 100"
/>

## State Data
```sql hpi_query_state
select 
yr,
period,
yr + (period-1)/4 as period_yr,
index_nsa,
index_sa,
place_name
 from hpi.index
where frequency = 'quarterly'
and level = 'State'
and hpi_flavor = 'purchase-only'
```

```sql state_list
select distinct place_name from hpi.index
where level = 'State'
```


<Grid cols=4>
{#each state_list as row, i}

<LineChart
  data={hpi_query_state.where(`place_name = '${row.place_name}'`)}
  x="period_yr"
  y="index_nsa"
  yMax=700
  xAxisLabels=false
  yGridlines=false
  title={row.place_name}
  downloadableData=false
  downloadableImage=false
/>

{/each}
</Grid>



