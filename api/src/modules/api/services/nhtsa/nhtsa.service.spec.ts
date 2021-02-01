import { Test, TestingModule } from '@nestjs/testing';
import { NHTSAService } from './nhtsa.service';
import { HttpModule } from '@nestjs/common';
import { VehicleVariable } from './schemas/vehicle-variable.schema';
import NHTSAServiceMock from './__mocks__/nhtsa.service';
import { VehicleVariableInterface } from './interfaces/vehicle-variable.interface';
import * as vehicleVariableResponse from './__stubs__/vehicle-variables-response.json';
import * as vehicleVariables from './__stubs__/vehicle-variables.json';

describe('NHTSAService', () => {
  let nhtsaService: NHTSAService;
  let nhtsaServiceMock: NHTSAServiceMock;
  // let vehicleVariableModel: ModelDefinition;
  const responseStub = vehicleVariableResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        NHTSAService,
        { provide: NHTSAServiceMock, useClass: NHTSAServiceMock },
        { provide: 'VehicleVariableModel', useClass: VehicleVariable }
      ]
    }).compile();

    nhtsaService = module.get<NHTSAService>(NHTSAService);
    nhtsaServiceMock = module.get<NHTSAServiceMock>(NHTSAServiceMock);
    // vehicleVariableModel = module.get<ModelDefinition>('VehicleVariableModel');
  });

  it('NHTSAService instance should be defined', () => {
    expect(nhtsaService).toBeDefined();
  });

  it('getVehicleVariables() should fetch vehicle variables JSON', (done) => {
    jest.spyOn(nhtsaServiceMock, 'getVehicleVariables');

    nhtsaServiceMock.getVehicleVariables().subscribe({
      next: (data: VehicleVariableInterface[]) => {
        expect(data.length).toBe(3);
      },
      error: (error) => {
        throw new Error(error);
      },
      complete: done()
    });
  });

  it('formatVariable() should format string vehicle variable response entity', (done) => {
    jest.spyOn(nhtsaServiceMock, 'formatVariable');
    jest.spyOn(nhtsaServiceMock, 'getLookupValues');

    nhtsaServiceMock.formatVariable(responseStub.Results[0]).subscribe({
      next: (variable: VehicleVariableInterface) => {
        expect(variable).toEqual({
          dataType: responseStub.Results[0].DataType,
          description: responseStub.Results[0].Description,
          varId: responseStub.Results[0].ID,
          name: responseStub.Results[0].Name
        });
      },
      error: (error) => {
        throw new Error(error);
      },
      complete: done()
    });
  });

  it('formatVariable() should format lookup vehicle variable response entity', (done) => {
    jest.spyOn(nhtsaServiceMock, 'formatVariable');

    nhtsaServiceMock.formatVariable(responseStub.Results[1]).subscribe({
      next: (variable: VehicleVariableInterface) => {
        // expect(nhtsaServiceMock.getLookupValues).toHaveBeenCalled();
        expect(variable).toEqual({
          dataType: responseStub.Results[1].DataType,
          description: responseStub.Results[1].Description,
          varId: responseStub.Results[1].ID,
          name: responseStub.Results[1].Name,
          values: [...vehicleVariables[1].values]
        });
      },
      error: (error) => {
        throw new Error(error);
      },
      complete: done()
    });
  });

  it('getLookupValues() should add "values" property to vehicle variable entity', (done) => {
    nhtsaServiceMock
      .getLookupValues({
        dataType: 'lookup',
        description: '<p>Battery type field stores the battery chemistry type for anode, cathode.</p>',
        varId: 2,
        name: 'Battery Type'
      })
      .subscribe({
        next: (variable: VehicleVariableInterface) => {
          expect(variable).toEqual({
            dataType: responseStub.Results[1].DataType,
            description: responseStub.Results[1].Description,
            varId: responseStub.Results[1].ID,
            name: responseStub.Results[1].Name,
            values: [
              { id: 1, name: 'Lead Acid/Lead' },
              { id: 2, name: 'Nickel-Metal-Hydride/NiMH' },
              { id: 3, name: 'Lithium-ion/Li-Ion' }
            ]
          });
        },
        error: (error) => {
          throw new Error(error);
        },
        complete: done()
      });
  });
});
