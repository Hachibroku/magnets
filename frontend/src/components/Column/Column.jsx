import './Column.css'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Magnet } from '../Magnet/Magnet';

export const Column = ({ magnets }) => {
  return (
    <div className='column'>
        <SortableContext items={magnets} strategy={verticalListSortingStrategy}>        
        {magnets.map((magnet) => (
            <Magnet id={magnet.id} title={magnet.title} key={magnet.id} />
        ))}
        </SortableContext>
    </div>
  );
};
