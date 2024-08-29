import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BillSplittingApp = () => {
  const [totalBill, setTotalBill] = useState(100);
  const [people, setPeople] = useState([
    { name: 'Person 1', percentage: 50 },
    { name: 'Person 2', percentage: 50 },
  ]);

  useEffect(() => {
    normalizePeoplePercentages();
  }, [people]);

  const normalizePeoplePercentages = () => {
    const totalPercentage = people.reduce((sum, person) => sum + person.percentage, 0);
    if (totalPercentage !== 100) {
      const factor = 100 / totalPercentage;
      setPeople(people.map(person => ({
        ...person,
        percentage: Math.round(person.percentage * factor)
      })));
    }
  };

  const handlePercentageChange = (index, newValue) => {
    const newPeople = [...people];
    newPeople[index].percentage = newValue[0];
    setPeople(newPeople);
  };

  const handleNameChange = (index, newName) => {
    const newPeople = [...people];
    newPeople[index].name = newName;
    setPeople(newPeople);
  };

  const addPerson = () => {
    const newPercentage = Math.floor(100 / (people.length + 1));
    setPeople([...people, { name: `Person ${people.length + 1}`, percentage: newPercentage }]);
  };

  const removePerson = (index) => {
    if (people.length > 2) {
      const newPeople = people.filter((_, i) => i !== index);
      setPeople(newPeople);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bill Splitting App</h1>
      <div className="mb-4">
        <label className="block mb-2">Total Bill Amount:</label>
        <Input
          type="number"
          value={totalBill}
          onChange={(e) => setTotalBill(Number(e.target.value))}
          className="w-full"
        />
      </div>
      {people.map((person, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <Input
            value={person.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            className="mb-2"
          />
          <Slider
            value={[person.percentage]}
            onValueChange={(newValue) => handlePercentageChange(index, newValue)}
            max={100}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between">
            <span>{person.percentage}%</span>
            <span>${((totalBill * person.percentage) / 100).toFixed(2)}</span>
          </div>
          {people.length > 2 && (
            <Button onClick={() => removePerson(index)} className="mt-2">
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addPerson} className="mb-4">
        Add Person
      </Button>
      <div className="text-right font-bold">
        Total: ${totalBill.toFixed(2)}
      </div>
    </div>
  );
};

export default BillSplittingApp;