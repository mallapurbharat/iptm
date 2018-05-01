// tslint:disable no-let no-expression-statement
import * as Benchmark from 'benchmark'
import { ColumnMap, ColumnMapBuilder } from './columnMap'
import { iterable } from './columnMapIterator'
const rows = Array.from({ length: 100000 }, (_, i) => ({
  type: 'test',
  semantics: 'x',
  name: 'y',
  psn: i,
  seq: i,
  payload: i,
}))
const cm = ColumnMap.of(rows)
new Benchmark.Suite('columnMap')
  .add('ColumnMap.of', () => ColumnMap.of(rows))
  .add('ColumnMap.builder', () => {
    const builder = ColumnMapBuilder.create()
    rows.forEach(builder.add)
    return builder.build()
  })
  .add('ColumnMap.toArray', () => ColumnMap.toArray(cm))
  .add('iterate', () => {
    const it = iterable(cm)
    return [...it].length
  })
  .add('iterateRows explode/collapse', () => {
    return [...rows].map(x => ({ ...x }))
  })
  .on('cycle', (event: any) => {
    console.log(String(event.target))
  })
  .run({ async: true })