import React, { useEffect, useState } from 'react';
import axios from 'axios'

 
export const bugsService = async () =>{
    const data = await axios.get(`http://localhost:8000/get_bugs_service`);
    const result = data.data

    return result
}