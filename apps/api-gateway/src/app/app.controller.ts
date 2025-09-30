import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateAdminDto,
  CreateNewsDto,
  CreateFlightDto,
  UpdateAdminDto,
  UpdateFlightDto,
  UpdateNewsDto,
  CreateAirportDto,
  UpdateAirportDto,
  CreateCityDto,
  UpdateCityDto,
  CreateCountryDto,
  UpdateCountryDto,
  CreateCompanyDto,
  UpdateCompanyDto,
  CreatePlaneDto,
  UpdatePlaneDto,
  CreateClassDto,
  UpdateClassDto,
  CreateSeatDto,
  UpdateSeatDto,
  CreateUserDto,
} from '@my-airways/shared-dto-v2';
import { AuthGuard } from '@my-airways/shared-services-v2';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // Auth
  @Post('login/admin')
  loginAdmin(@Body() credentials: { input_email: string; password: string }) {
    return this.appService.loginAdmin(credentials);
  }

  @Post('login/user')
  loginUser(@Body() credentials: { input_email: string; password: string }) {
    return this.appService.loginUser(credentials);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.appService.registerUser(dto);
  }

  @Post('refresh')
  refresh(@Body('userId') userId: number) {
    return this.appService.refreshToken(userId);
  }

  @Post('logout')
  logout(@Body('userId') userId: number) {
    return this.appService.logout(userId);
  }

  // Admin
  @Post('admins')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('super_admin')
  createAdmin(@Body() admin: CreateAdminDto) {
    return this.appService.createAdmin(admin);
  }

  @Get('admins')
  @UseGuards(AuthGuard)
  getAdmins(@Req() req) {
    return this.appService.getAdmins();
  }

  @Get('admins/:id')
  getAdminById(@Param('id') id: string) {
    return this.appService.getAdminById(+id);
  }

  @Patch('admins/:id')
  updateAdmin(@Param('id') id: string, @Body() data: UpdateAdminDto) {
    return this.appService.updateAdmin(+id, data);
  }

  @Delete('admins/:id')
  deleteAdmin(@Param('id') id: string) {
    return this.appService.deleteAdmin(+id);
  }

  //-------------------------------------------------------------
  // Flight
  @Get('flight')
  // @UseGuards(AuthGuard('jwt'))
  getFlights() {
    return this.appService.getFlights();
  }

  @Get('flight/:id')
  getFlightById(@Param('id') id: string) {
    return this.appService.getFlightById(+id);
  }

  @Post('admins/flight')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin', 'super_admin')
  createFlight(@Body() flight: CreateFlightDto) {
    return this.appService.createFlight(flight);
  }

  @Patch('admins/flight/:id')
  updateFlight(@Param('id') id: string, @Body() data: UpdateFlightDto) {
    return this.appService.updateFlight(+id, data);
  }

  @Delete('admins/flight/:id')
  deleteFlight(@Param('id') id: string) {
    return this.appService.deleteFlight(+id);
  }

  //--------------------------------------------------------------
  // News
  @Get('news')
  // @UseGuards(AuthGuard('jwt'))
  getNews() {
    return this.appService.getNews();
  }

  @Get('news/:id')
  getNewsById(@Param('id') id: string) {
    return this.appService.getNewsById(+id);
  }

  @Post('admins/news')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin', 'super_admin')
  createNews(@Body() news: CreateNewsDto) {
    return this.appService.createNews(news);
  }

  @Patch('admins/news/:id')
  updateNews(@Param('id') id: string, @Body() data: UpdateNewsDto) {
    return this.appService.updateNews(+id, data);
  }

  @Delete('admins/news/:id')
  deleteNews(@Param('id') id: string) {
    return this.appService.deleteNews(+id);
  }

  // ==================ONLY---DB---QUERIES=========================
  // ---- Airports ------------------------------------------------
  @Post('airport')
  createAirport(@Body() data: CreateAirportDto) {
    return this.appService.createAirport(data);
  }

  @Get('airport')
  getAirports() {
    return this.appService.getAirports();
  }

  @Get('airport/:id')
  getAirportById(@Param('id') id: string) {
    return this.appService.getAirportById(Number(id));
  }

  @Patch('airport/:id')
  updateAirport(@Param('id') id: string, @Body() data: UpdateAirportDto) {
    return this.appService.updateAirport(Number(id), data);
  }

  @Delete('airport/:id')
  deleteAirport(@Param('id') id: string) {
    return this.appService.deleteAirport(Number(id));
  }

  // ---- Cities ------------------------------------------------
  @Post('city')
  createCity(@Body() data: CreateCityDto) {
    return this.appService.createCity(data);
  }

  @Get('city')
  getCities() {
    return this.appService.getCities();
  }

  @Get('city/:id')
  getCityById(@Param('id') id: string) {
    return this.appService.getCityById(Number(id));
  }

  @Patch('city/:id')
  updateCity(@Param('id') id: string, @Body() data: UpdateCityDto) {
    return this.appService.updateCity(Number(id), data);
  }

  @Delete('city/:id')
  deleteCity(@Param('id') id: string) {
    return this.appService.deleteCity(Number(id));
  }

  // ---- Countries ------------------------------------------------
  @Post('country')
  createCountry(@Body() data: CreateCountryDto) {
    return this.appService.createCountry(data);
  }

  @Get('country')
  getCountries() {
    return this.appService.getCountries();
  }

  @Get('country/:id')
  getCountryById(@Param('id') id: string) {
    return this.appService.getCountryById(Number(id));
  }

  @Patch('country/:id')
  updateCountry(@Param('id') id: string, @Body() data: UpdateCountryDto) {
    return this.appService.updateCountry(Number(id), data);
  }

  @Delete('country/:id')
  deleteCountry(@Param('id') id: string) {
    return this.appService.deleteCountry(Number(id));
  }

  // ---- Companies ------------------------------------------------
  @Post('company')
  createCompany(@Body() data: CreateCompanyDto) {
    return this.appService.createCompany(data);
  }

  @Get('company')
  getCompanies() {
    return this.appService.getCompanies();
  }

  @Get('company/:id')
  getCompanyById(@Param('id') id: string) {
    return this.appService.getCompanyById(Number(id));
  }

  @Patch('company/:id')
  updateCompany(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    return this.appService.updateCompany(Number(id), data);
  }

  @Delete('company/:id')
  deleteCompany(@Param('id') id: string) {
    return this.appService.deleteCompany(Number(id));
  }

  // ---- Planes ------------------------------------------------
  @Post('planes')
  createPlane(@Body() data: CreatePlaneDto) {
    return this.appService.createPlane(data);
  }

  @Get('planes')
  getPlanes() {
    return this.appService.getPlanes();
  }

  @Get('planes/:id')
  getPlaneById(@Param('id') id: string) {
    return this.appService.getPlaneById(Number(id));
  }

  @Patch('planes/:id')
  updatePlane(@Param('id') id: string, @Body() data: UpdatePlaneDto) {
    return this.appService.updatePlane(Number(id), data);
  }

  @Delete('planes/:id')
  deletePlane(@Param('id') id: string) {
    return this.appService.deletePlane(Number(id));
  }

  // ---- Classes ------------------------------------------------
  @Post('class')
  createClass(@Body() data: CreateClassDto) {
    return this.appService.createClass(data);
  }

  @Get('class')
  getClasses() {
    return this.appService.getClasses();
  }

  @Get('class/:id')
  getClassById(@Param('id') id: string) {
    return this.appService.getClassById(Number(id));
  }

  @Patch('class/:id')
  updateClass(@Param('id') id: string, @Body() data: UpdateClassDto) {
    return this.appService.updateClass(Number(id), data);
  }

  @Delete('class/:id')
  deleteClass(@Param('id') id: string) {
    return this.appService.deleteClass(Number(id));
  }

  // ---- Seats ------------------------------------------------
  @Post('seat')
  createSeat(@Body() data: CreateSeatDto) {
    return this.appService.createSeat(data);
  }

  @Get('seat')
  getSeats() {
    return this.appService.getSeats();
  }

  @Get('seat/:id')
  getSeatById(@Param('id') id: string) {
    return this.appService.getSeatById(Number(id));
  }

  @Patch('seat/:id')
  updateSeat(@Param('id') id: string, @Body() data: UpdateSeatDto) {
    return this.appService.updateSeat(Number(id), data);
  }

  @Delete('seat/:id')
  deleteSeat(@Param('id') id: string) {
    return this.appService.deleteSeat(Number(id));
  }
}
