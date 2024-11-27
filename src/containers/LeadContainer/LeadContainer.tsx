import { useEffect } from "react";
import {
  useLazyGetEntitiesQuery,
  useLazyGetEntityByNameQuery,
} from "../../store/api/entityApi";

export const LeadContainer = () => {
  const [getEntities] = useLazyGetEntitiesQuery();
  const [getEntity] = useLazyGetEntityByNameQuery();

  useEffect(() => {
    getEntities()
      .unwrap()
      .then(([, entityName]) => {
        getEntity(entityName)
          .unwrap()
          .then((entity) => {
            console.log(entity);
          });
      });
  }, [getEntities, getEntity]);

  return <div>LeadContainer</div>;
};
