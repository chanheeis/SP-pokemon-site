const selectByHabitatType=(habitat,type)=>{
    const {isSanitary,isActive,isIndependent}=habitat;
    const {isMeek,isExtrovert,isCurious,isUnusual}=type;
    return `
        SELECT poke_type.poke_id,poke_info.*, type_name_ko, habitat_name_ko FROM poke_type
        LEFT JOIN poke_info ON (poke_info.poke_id=poke_type.poke_id)
        LEFT JOIN type ON (poke_type.type_id=type.type_id)
        LEFT JOIN poke_habitat ON (poke_type.poke_id=poke_habitat.poke_id)
        LEFT JOIN habitat ON (poke_habitat.habitat_id=habitat.habitat_id)
        WHERE poke_type.type_id IN (
            SELECT type_id FROM type
            WHERE
                isMeek=${isMeek} AND
                isExtrovert=${isExtrovert} AND
                isCurious=${isCurious} AND
                isUnusual=${isUnusual})
        AND poke_type.poke_id IN (
            SELECT poke_id FROM poke_habitat
            WHERE habitat_id IN (
                SELECT habitat_id FROM habitat
                WHERE 
                    isSanitary=${isSanitary} AND
                    isActive=${isActive} AND
                    isIndependent=${isIndependent}))
    `;
}

const selectByType=(type)=>{
    const {isMeek,isExtrovert,isCurious,isUnusual}=type;
    return `
        SELECT poke_type.poke_id,poke_info.*,type_name_ko, habitat_name_ko FROM poke_type
        LEFT JOIN poke_info ON (poke_info.poke_id=poke_type.poke_id)
        LEFT JOIN type ON (poke_type.type_id=type.type_id)
        LEFT JOIN poke_habitat ON (poke_type.poke_id=poke_habitat.poke_id)
        LEFT JOIN habitat ON (poke_habitat.habitat_id=habitat.habitat_id)
        WHERE poke_type.type_id IN (
            SELECT type_id FROM type
            WHERE
                isMeek=${isMeek} AND
                isExtrovert=${isExtrovert} AND
                isCurious=${isCurious} AND
                isUnusual=${isUnusual})
    `;
}

module.exports={
    selectByHabitatType,selectByType
};